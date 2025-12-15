import { getAll } from '../repositories/frequency.repository';

export class FrequencyService {
    async getAllFrequencies() {
        return await getAll();
    }
}
