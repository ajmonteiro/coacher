import { BaseHttpService } from '@resourge/http-service';

import { envFatSecretUrl } from '../utils/Environment';

class NewHttpService extends BaseHttpService {
}
const HttpFatSecretService = new NewHttpService({
	baseUrl: envFatSecretUrl
});

export default HttpFatSecretService;
