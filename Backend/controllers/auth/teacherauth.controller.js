import db from "../../config/db.js";

export const registerteacher = (req, res) => {
    try{
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginteacher = (req, res) => {
    try{
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}