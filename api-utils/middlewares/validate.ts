import { object, ObjectSchema, number } from "yup";
import { ObjectShape } from "yup/lib/object";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function validate(
  schema: ObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (["POST", "PUT"].includes(<string>req.method)) {
      try {
        const newSchema =
          req.method === "POST"
            ? schema
            : schema.concat(object({ id: number().required().positive() }));

        req.body = await newSchema.validate(req.body, {
          strict: true,
          stripUnknown: true,
        });
      } catch (err) {
        return res.status(400).json(err);
      }
    }

    await handler(req, res);
  };
}
