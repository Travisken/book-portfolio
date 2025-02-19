"use client";
import React, { useState } from 'react';
import { database } from '@/app/firebase';
import { ref, set } from 'firebase/database';

const UploadJson: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = async (event: ProgressEvent<FileReader>) => {
                try {
                    const jsonData = JSON.parse(event.target?.result as string);
                    // Set the path to 'data' to store it directly at the root
                    const dataPath = 'data'; // This stores the data at the root level
                    await set(ref(database, dataPath), jsonData);
                    alert('Data uploaded successfully!');
                } catch (error) {
                    console.error('Error parsing JSON or uploading data: ', error);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid JSON file.');
        }
    };

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload JSON</button>
        </div>
    );
};

export default UploadJson;