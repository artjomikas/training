import { IReview } from "../domain/IReview";
import { BaseEntityService } from "./BaseEntityService";

export class CommentService extends BaseEntityService<IReview> {
    constructor(){
        super('v1/Comments');
    }
}
