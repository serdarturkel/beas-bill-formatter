import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { any } from "prop-types";
import React, { useImperativeHandle, useState } from "react";

const Notification = React.forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        show(opts) {
            setOptions(opts).then(show());
        }
    }));

    const [infoSB, setInfoSB] = useState(false);
    const openInfoSB = () => setInfoSB(true);
    const closeInfoSB = () => setInfoSB(false);
    const [snackOptions, setSnackOptions] = useState({
        icon: "notifications",
        title: "Title",
        content: "Content",
        dateTime: "1 sec ago",
    });
    const setOptions = async (opts) => {
        return new Promise((resolve) => {
            setSnackOptions(opts);
            resolve()
        })
    };
    const show = () => {
        openInfoSB();
    }
    return (
        <MDBox>
            <MDSnackbar
                color={snackOptions.color}
                icon={snackOptions.icon}
                title={snackOptions.title}
                content={snackOptions.content}
                dateTime={snackOptions.dateTime}
                open={infoSB}
                onClose={closeInfoSB}
                close={closeInfoSB}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </MDBox>
    );
});

export default Notification;