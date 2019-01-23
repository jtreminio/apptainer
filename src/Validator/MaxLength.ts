import {
    Validator,
} from "formstate";

type Options = {
    value: string | null | undefined,
    length: number,
    message?: string,
}

const MaxLength: Validator<Options> = ({value, length, message}) => {
    message = message || `Maximum length allowed: ${length}`;

    if (value != null && value.trim().length > length) {
        return message;
    }

    return null;
};

export default MaxLength;
