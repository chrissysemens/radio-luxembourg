import { WhereFilterOp } from '@firebase/firestore-types';

export class FirebaseQuery {
    key: string
    op: WhereFilterOp
    value: string

    constructor(key: string, opString: string, value: string){
        this.key = key;
        this.op = opString as WhereFilterOp;
        this.value = value;
    }
}