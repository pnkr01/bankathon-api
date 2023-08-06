import { Types } from 'mongoose';
import { z } from 'zod';

type IDValidatorResult = [true, Types.ObjectId] | [false, undefined];

export function idValidator(id: string): IDValidatorResult {
	const validator = z
		.string()
		.refine((value) => Types.ObjectId.isValid(value))
		.transform((value) => new Types.ObjectId(value));

	const result = validator.safeParse(id);
	if (result.success === false) {
		return [false, undefined];
	} else {
		return [true, result.data];
	}
}
