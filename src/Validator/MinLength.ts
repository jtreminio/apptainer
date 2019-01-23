import {
    Validator,
} from "formstate";

type Options = {
    value: string | null | undefined,
    length: number,
    message?: string,
}

const MinLength: Validator<Options> = ({value, length, message}) => {
    message = message || `Minimum length required: ${length}`;

    if (value != null && value.trim().length < length) {
        return message;
    }

    return null;
};

export default MinLength;
