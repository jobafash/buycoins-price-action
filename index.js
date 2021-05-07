var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const express_graphql_1 = __importDefault(require('express-graphql'));
const schema_1 = __importDefault(require('./dist/schema'));
const path_1 = __importDefault(require('path'));
const app = express_1.default();
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  app.use(
    express_1.default.static(path_1.default.join(__dirname, '../', 'build')),
  );
  app.get('/*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../', 'build/index.html'));
  });
}
// app.use(validateUserSession.bind(this, firebase));
app.use(
  '/graphql',
  express_graphql_1.default({ schema: schema_1.default, graphiql: true }),
);
exports.default = app;