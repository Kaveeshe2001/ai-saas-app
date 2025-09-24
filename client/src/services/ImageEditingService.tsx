import apiClient from "./apiClient";

export const removeObjectAPI = async (imageFile: File, maskFile: File) => {
    const formData = new FormData();
    formData.append('imageFIle', imageFile);
    formData.append('maskFile', maskFile);

    const response = await apiClient.post('/image-editing/remove-object', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
}