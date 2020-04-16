import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { $importer } from "../importer";

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  $importer
    .stats()
    .then((stats) => {
      callback(undefined, {
        statusCode: 200,
        body: JSON.stringify({ stats }, null, 4),
      });
    })
    .catch(callback);
};

export { handler };
