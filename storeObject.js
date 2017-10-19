import fs from 'fs';
import Promise from 'bluebird';
import Hashids from 'hashids';
const fsPromise = Promise.promisifyAll(fs);

/* I decided to store the objects in the file system because storing
 * large data in a database might not be a good idea because of the 
 * following reasons:
 *   * it makes the data less portable.
 *   * the level of knowledge required to maintain a database goes up 
 *     in proportion to the size of the database
 *   * daily backups will be a lot slower
 *   * it requires more customized settings to handle larger objects */


/* ------------------MAIN------------------- */
/* takes an object, stores it, and the returns
 * a promise for the fileId                  */
export function storeObjects() {

  /*  Node throws an out of heap memory error if you 
   *  try to use too much memory                    */
  if (arguments.length > 10) throw new Error('system not designed to handle more than 10 files');
  if (![...arguments].every(el => typeof el === 'object')) throw new Error('arguments must be objects');

  /* returns an array of fileId promises */
  return Promise.map([...arguments], data => {
    let fileId;
    let path = './storage/';

    /* a promise that resolves to an fileId*/
    return new Promise((resolve, reject) => {
      const checkAndAddFile = () => {
        /* create a fileId using a hashId generator */
        fileId = createFileId();

        /* check for collision */
        fs.exists(path + fileId, function (exists) {

          if (!exists) {
            writeData(path + fileId, data)
              .then(resolve(fileId))
              .catch(reject);

          /* if a collision happened, just try again */
          } else {
            checkAndAddFile();
          }
        });
      };

      checkAndAddFile();
    });
  });
}

/* creates a random 25 character alpha-numeric hash ID */
export function createFileId() {

  /* using a hashing function is a good way to avoid collisions 
   * and generate unique ids                                    */
  const salt = '2lq3kjrldkjfasdlkj';
  const hashids = new Hashids(salt, 25);
  const randNum = Math.floor(Math.random() * Math.pow(10, 20));

  return hashids.encode(randNum);
}

/* async-ly write data to file system and returns a promise for the job */
export function writeData(path, data) {
  if (!data) throw new Error('!no data');

  const stream = fs.createWriteStream(path);
  return new Promise((resolve) => {
      stream.once('open', function() {

        /* converts the data to a string for writing to file */
        stream.write(JSON.stringify(data));
        stream.end(resolve);
      }
    );
  });
}

/* async-ly read and returns the object. It takes in a fileId,
 * returns an  */
export function readObject(fileId) {
  var path = './storage/' + fileId;
  return fsPromise.readFileAsync(path)
    .then(data => data.toString())
    .catch(console.error);
}
