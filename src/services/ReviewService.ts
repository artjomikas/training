import { IReview } from "../domain/IReview";
import { BaseEntityService } from "./BaseEntityService";

export class ReviewService extends BaseEntityService<IReview> {
    constructor(){
        super('v1/Reviews');
    }
}
