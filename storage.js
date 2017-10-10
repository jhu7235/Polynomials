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
 * - it requires more customized settings to handle larger objects
 */

function createHashPath() {
  /* using a hashing function is a good way to avoid collisions 
   * and generate unique ids
   */
  const salt = '2lq3kjrldkjfasdlkj';
  const hashids = new Hashids(salt, 25);
  const randNum = Math.floor(Math.random() * Math.pow(10, 20));
  return hashids.encode(randNum);
}

function writeData(path, data) {
  var stream = fs.createWriteStream(path);
  
  /* even though we don't have any data to return, we still
   * need to return a promise to await off of
   */
  return new Promise((resolve, reject) => {
    resolve(
      stream.once('open', function() {
        stream.write(JSON.stringify(data));
        stream.end();
      })
    )
  });
}

export function storeObjects() {
  /*  Node throws an out of heap memory error if you 
   *  try to use too much memory
   */
  if (arguments.length > 10) throw new Error('system not designed to handle more than 10 files');

  let path = './storage/';
  let id = createHashPath();

  /* commands are wrapped in promises to make async read and write
   * easier to support
   */
  return Promise.map([...arguments], async function write(data) {
    await new Promise((resolve, reject) => {
      fs.exists(path + id, async function (exists) {
        if (!exists) {
          await writeData(path + id, data);
        } else {
          id = createHashPath();
          await writeData(path + id, data);
        }
      });
    });

    /* the id  should be stored in a database along 
     * with meta data about the object
     */
    return id;
  });

}


export async function readObject(id) {
  let data = await read(id)
    .then(data => data.toString())
    .catch(console.error);
  return data;
}

function read(id) {
  var path = './storage/' + id;
  return fs.readFileAsync(path)
    .catch(console.error);
}

