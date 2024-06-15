import * as Yup from "yup";
import {today} from './today';
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title must be at least 10 characters")
    .max(140, "Title must be at atmost 140 characters in length"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Title must be at least 10 characters")
    .max(500, "Title must be at atmost 140 characters in length"),
  priority: Yup.string().required("Priority is required"),
  isCompleted: Yup.bool(),
  dueDate:Yup.string().required("Date is required").test('should ', (value) => {
    const date1 = new Date(today());
    const date2 = new Date(value);
    const diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(date2 - date1 < 0 ){
      diffDays = diffDays * -1
    }
    return diffDays < 0 ? false : true
  })
});

export default validationSchema;