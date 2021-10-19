const dnsPromises = require("dns").promises;
const axios = require('axios');
const emailMisspelled = require("email-misspelled").default;
const top100 = require("email-misspelled").top100;

const emailChecker = emailMisspelled({ domains: top100 })

exports.checkIfDisposable = async email => {
  try {
    const result = await axios.get(
      'https://disposable.debounce.io/',
      { params: { email } },
    );
    return result.data?.disposable === 'false' ? false : true
  } catch (err) {
    return undefined
  }
}

exports.checkMisspelling = email => {
  try {
    const result =  emailChecker(email);
    if (result?.length) {
      return {
        misspelled: true,
        autocorrect: result[0].corrected,
      }
    }
    return { misspelled: false }
  } catch (err) {
    return undefined
  }
}


exports.mxExists = email => {
  return new Promise ((res, rej) => {
    const hostname = email.split("@")[1];

    try {
      dnsPromises.resolveMx(hostname).then(addresses => {
        if (addresses?.length > 0) {
          addresses[0].exchange ? res(true) : res(false);
        }
      })
      .catch(err => {
        console.log('false')
        res(false);      
      });
    } catch (err) {
      console.log("ERROR:\n" + err);
      rej(false);
    }
  });
}