import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderAsset from "react-loader-spinner";

export const Loader = () => <div className="container is-fluid has-text-centered" data-cy="Loader">
    <LoaderAsset
        type="MutatingDots"
        color="#00BFFF"
        height={100}
        width={100}
    />
</div>