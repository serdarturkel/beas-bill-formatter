
import styles from "./A4Page.css";
import Editor from "./components/Editor";

const A4Page = () => {
    return (
        <div>
            <div class="page" page-size="A4" layout="portrait">
                <div class="page-content">
                    <Editor/>
                </div>
            </div>
        </div>
    )
};

export default A4Page;