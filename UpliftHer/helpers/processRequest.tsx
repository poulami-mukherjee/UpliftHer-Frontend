
type Props<T> = {
    loading: boolean,
    request: () => Promise<T>,
    onSuccess: (data: T) => void,
    onError: (error: string) => void
};

export default async function processRequest<T>(props: Props<T>) {
    props.loading = true;
    try {
        const result = await props.request();
        console.log("result ", result);
        props.onSuccess(result);
    }
    catch (e: any) {
        props.onError(e);
    }
    finally {
        props.loading = false;
    }
}
