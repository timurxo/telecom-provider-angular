import Plans from './Plans';
import PhoneInfo from './PhoneInfo';

// ITS A LIST OF LISTS

class UserPlans {
    userplan_id!: number;
        user_info_user_id!: number;
        plans_plan_id!: number;
    plans!: Plans;        // ****
    phoneInfo!: PhoneInfo[];    // ****
}



export default UserPlans;