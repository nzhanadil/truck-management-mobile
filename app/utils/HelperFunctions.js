import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageDb } from "../config/firebase";
import 'react-native-get-random-values'
import { v4 } from "uuid";

export const getCurrentDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = mm + '-' + dd + '-' + yyyy;

    return formattedDate;
}

export const uploadImages  = async (path, files) => {
    const promises = [];
    const downloadURLs = [];

    for (let i = 0; i < files.length; i++) {
        const imagePath = files[i].uri;
        const storageRef = ref(storageDb, `${path}/${v4()}`); // Change 'some-child' to your desired child path

        promises.push(
            new Promise(async (resolve, reject) => {
                try {
                    const blob = await new Promise((resolveBlob, rejectBlob) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            resolveBlob(xhr.response);
                        };
                        xhr.onerror = function (e) {
                            rejectBlob(new TypeError("Network request failed"));
                        };
                        xhr.responseType = "blob";
                        xhr.open("GET", imagePath, true);
                        xhr.send(null);
                    });

                    // Upload the blob to Firebase Storage
                    const snapshot = await uploadBytes(storageRef, blob);

                    // Get the download URL of the uploaded image
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    downloadURLs.push(downloadURL);

                    resolve(snapshot);
                } catch (error) {
                    console.error('Failed to upload image:', error);
                    reject(error);
                }
            })
        );
    }

    try {
        await Promise.all(promises);
        return downloadURLs;
    } catch (error) {
        console.error('Failed to upload images:', error);
        throw error;
    }
};
