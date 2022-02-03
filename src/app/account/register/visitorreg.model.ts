export class RegisterVisitor {
    constructor(

        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public contact: any=null,
        public parents?: number,
        public address?: string,
        public city?: string,
        public pincode?: number,
        public email: any=null,
        public password: any=null,
        public standard?: string,
        public schoolname?: string,
        public lastqulification?: string,
        public percentage?: string,
        public profile?: string,
        public batchtime?: string,
        public stdid?: number,
        public subid?: number,
        public createddate?: Date,
        public updateddate?: Date,
        public isactive?: Boolean,
        public detailsupdated?: Boolean,
        public index?: number,
        public school?: string,
        public qulification?: string,
        public visitorOtp?: number,
        public visitorId:any=null,

    ) {
    }
}
