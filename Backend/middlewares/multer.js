import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file"); // signUp ma file ane anu file nu name same j hovu joie