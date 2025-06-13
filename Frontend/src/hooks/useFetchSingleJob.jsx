import { setfetchSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchSingleJob = () => {
    const { fetchId } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${fetchId}`, { withCredentials: true });
                // console.log(res.data);
                if (res.data.success) {
                    dispatch(setfetchSingleJob(res.data.getJob));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJob();
    }, []);
}

export default useFetchSingleJob;