import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadImage = (image, onProgress, onSuccess, onError) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
        "state_changed",
        snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            onProgress(progress);
        },
        error => {
            onError(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(onSuccess).catch(onError);
        }
    );
};
