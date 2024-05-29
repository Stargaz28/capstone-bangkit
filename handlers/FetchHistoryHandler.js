const { Firestore } = require('@google-cloud/firestore');

// Handler to get history for the logged-in user
async function getHistory (req, h) {
    const userId = req.auth.credentials.user.id; // Get userId from authenticated session
    const db = new Firestore({
        projectId: 'testing-capstone-2',
        keyFilename: 'keyfile.json'
    });

    try {
        // Mengambil koleksi history untuk userId tertentu
        const histCollection = await db.collection('predictions').doc(userId).collection('history').get();
        const historyData = histCollection.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                result: data.result,
                createdAt: data.createdAt
            };
        });

        if (historyData.length === 0) {
            return h.response('No file').code(404);
        } else {
            return h.response(historyData).code(200);
        }

    } catch (error) {
        console.error('Error getting history data:', error);
        return h.response('Error getting document').code(500);
    }
}

// Handler to get specific history detail for the logged-in user
async function getHistoryDetailsId (req, h) {
    const userId = req.auth.credentials.user.id; // Get userId from authenticated session
    const db = new Firestore({
        projectId: 'testing-capstone-2',
        keyFilename: 'keyfile.json'
    });
    const idParam = req.params.id;

    try {
        const docRef = db.collection('predictions').doc(userId).collection('history').doc(idParam);
        const doc = await docRef.get();

        if (!doc.exists) {
            return h.response('Document not found').code(404);
        } else {
            return h.response(doc.data()).code(200);
        }
    } catch (error) {
        console.error('Error getting history document:', error);
        return h.response('Error getting document').code(500);
    }
}

module.exports = { getHistory, getHistoryDetailsId };
