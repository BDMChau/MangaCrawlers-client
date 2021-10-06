import axios from 'axios';


const cloudinary_name = mangacrawlers;
const cloudinary_preset = preset01;

const END_POINT = `https://api.cloudinary.com/v1_1/${cloudinary_name}/upload`;

const cloudinaryApi = {
    uploadFile: async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", cloudinary_preset)
        formData.append("folder", "notification_imgs")
        formData.append("cloud_name", cloudinary_name)

        try {
            const response = await axios({
                method: 'post',
                url: END_POINT,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return response;
        } catch (err) {
            console.log(err);
            return {
                err: 'upload failed'
            };
        }

    },
}

export default cloudinaryApi;
