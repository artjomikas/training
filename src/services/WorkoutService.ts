import { BaseEntityService } from "./BaseEntityService";

export class WorkoutService extends BaseEntityService<any> {
    constructor(){
        super('v1/Workouts');
    }
}
