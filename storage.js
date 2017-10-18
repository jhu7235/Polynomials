import fs from 'fs';
import Promise from 'bluebird';
import Hashids from 'hashids';
const fsPromise = Promise.promisifyAll(fs);

/* I decided to store the objects in the file system because storing
 * large data in a database might not be a good idea because of the 
 * following reasons:
 * - it makes the data less portable.
 * - the level of knowledge required to maintain a database goes up 
 *    in proportion to the size of the database
 * - daily backups will be a lot slower
 * - it requires more customized settings to handle larger objects */


/* ------------------MAIN-------------------*/
/* takes an object, stores it, and the returns
 * a promise for the id of the location */
export function storeObjects() {

  /*  Node throws an out of heap memory error if you 
   *  try to use too much memory
   */
  if (arguments.length > 10) throw new Error('system not designed to handle more than 10 files');
  if (![...arguments].every(el => typeof el === 'object')) throw new Error('arguments must be objects');

  let path = './storage/';

  /* commands are wrapped in promises to make async read and write
   * easier to support */
  return Promise.map([...arguments], function write(data) {
    let id;
    new Promise(function(resolve){
      if (!data) throw new Error('no data!');

      function checkAndAddFile() {
        id = createHashPath();
        fs.exists(path + id, function (exists) {
          if (!exists) {
            writeData(path + id, data)
              .then(databack => {
                console.log('databack', databack);
                return databack;
              })
              .then(resolve)
              .catch(console.error);
          } else {
            checkAndAddFile();
          }
        });
      }
      checkAndAddFile();
    });

    return id;
  });

}

/* creates a random 25 character alpha-numeric hash ID */
export function createHashPath() {

  /* using a hashing function is a good way to avoid collisions 
   * and generate unique ids */
  const salt = '2lq3kjrldkjfasdlkj';
  const hashids = new Hashids(salt, 25);
  const randNum = Math.floor(Math.random() * Math.pow(10, 20));

  return hashids.encode(randNum);
}

/* async-ly write data to file system and returns a promise for the job */
export function writeData(path, data) {
  var stream = fs.createWriteStream(path);
  if (!data) throw new Error('!no data');

  return new Promise((resolve) => {
      stream.once('open', function() {
        stream.write(JSON.stringify(data));
        stream.end(resolve(data));
      }
    );
  });
}

/* async-ly read and returns the object */
export function readObject(id) {
  var path = './storage/' + id;
  return fsPromise.readFileAsync(path)
    .then(data => data.toString())
    .catch(console.error);
}
