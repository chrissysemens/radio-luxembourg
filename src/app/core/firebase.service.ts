import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseQuery } from '../query-types/firbase.query';

/** The base Firebase Data Service. */
export abstract class FirebaseService<T> {

    constructor(protected fs: AngularFirestore){}

    add(path: string, item: T){
        const obj = JSON.parse(JSON.stringify(item));
        return this.fs.collection(path).add(obj);
    }

    delete(path: string){
        return this.fs.doc(path).delete();
    }
    
    list(path: string){
        return this.fs.collection(path);
    }

    query(path: string, query: FirebaseQuery, limit?: number){
        return this.fs
            .collection(path, ref => ref
                .where(query.key, query.op, query.value)
                .limit(limit))
    }    
}