export class Movie{

	constructor(

		public id?: number,
		public name?: string,
		public director?: string,
		public imageUrl?: string,
		public duration?: number,
		public releaseDate?: Date,
		public genres?: Array<string>, 
 
		){}
	
}
