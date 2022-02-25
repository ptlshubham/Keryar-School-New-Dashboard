export class Syllabus {
    constructor(

        public id?: number,
        public stdid?: number,
        public subid?: number,
        public chapid?: number,
        public chapname?: string,
        public videoTitle?: string,
        public videotitle?: string,
        public link?: string,
        public videolink?: string,
        public image?: string,
        public descripition?: string,
        public videoLength?: string,
        public videolength?:string,
        public createddate?: Date,
        public updateddate?: Date,
        public isactive?: boolean,
        public index?: number,
        public color?: string,
    ) {
    }
}
