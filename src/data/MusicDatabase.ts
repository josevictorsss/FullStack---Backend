import { BaseDatabase } from "./BaseDatabase";


export class MusicDatabase extends BaseDatabase {
    public insertMusic = async():Promise<void> => {
        try {

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}