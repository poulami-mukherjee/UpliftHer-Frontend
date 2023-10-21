import { IResponse } from "../services/interfaces/IResponse";

type Props<T> = {
    loading: boolean,
    request: () => Promise<T>,
    onSuccess: (data: T | null) => void,
    onError: (error: string) => void
};

export default async function processRequest<T>(props: Props<T>) {
    props.loading = true;
    try {
        const result = await props.request() as IResponse<T>;
        console.log("result ", result);

        if (!result.isSuccess) {
            throw new Error(result.error);
        }

        props.onSuccess(result.data);
    }
    catch (e: any) {
        let message = "An error occurred";
        if (typeof e === "string") {
            message = e;
        } else if (e instanceof Error) {
            message = e.message;
        }

        props.onError(message);
    }
    finally {
        props.loading = false;
    }
}
