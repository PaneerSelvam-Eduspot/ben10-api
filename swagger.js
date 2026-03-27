import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerSpec = YAML.load(path.join(__dirname, 'swagger.yaml'));


export default swaggerSpec;