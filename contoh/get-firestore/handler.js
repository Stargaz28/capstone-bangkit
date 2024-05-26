const Firestore = require('@google-cloud/firestore');

async function lettucePenyakit1(request, h) {
  const db = new Firestore({
    projectId: 'testing-capstone-2',
    keyFilename: 'keyfile.json',
  });

  try {
    const corpsRef = db.collection('corps').doc('sayur/lettuce/penyakit1');
    const doc = await corpsRef.get();
    if (!doc.exists) {
      return h.response('No such document!').code(404);
    } else {
      return h.response(doc.data()).code(200);
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return h.response('Error getting document').code(500);
  }
}

module.exports = {
  lettucePenyakit1,
};
