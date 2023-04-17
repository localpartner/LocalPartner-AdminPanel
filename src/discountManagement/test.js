import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const TestDemo = () =>{
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ firstName: "", lastName: "" }],
      test1: [{ firstName: "", lastName: "" }]
    }
  });
  // const {
  //   fields,
  //   append,
  //   remove
  // } = useFieldArray({
  //   control,
  //   name: "test"
  // });
  const {
    fields: foodFields,
    append: foodAppend,
    remove: foodRemove
  } = useFieldArray({ control, name: "test" });

  const {
    fields: foodsFields,
    append: foodsAppend,
    remove: foodsRemove
  } = useFieldArray({ control, name: "test1" });
  
  const onSubmit = (data) => console.log("data", data);

    return(
        <>
        <h1>Test</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Field Array </h1>
              <ul>
                {foodFields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input {...register(`test.${index}.firstName`)} />
                      <Controller render={({ field }) => <input {...field} />} name={`test.${index}.lastName`} control={control} />
                      <button type="button" onClick={() => { foodAppend(); }}> + </button>
                      <button type="button" onClick={() => foodRemove(index)}> - </button>
                    </li>
                  );
                })}
                <hr></hr>
                <h1>Check demo </h1>
                {foodsFields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input {...register(`test1.${index}.firstNames`)} />
                      <Controller render={({ field }) => <input {...field} />} name={`test.${index}.lastNames`} control={control} />
                      <button type="button" onClick={() => { foodsAppend(); }}> + </button>
                      <button type="button" onClick={() => foodsRemove(index)}> - </button>
                    </li>
                  );
                })}
              </ul>
            <input type="submit" />
          </form>
        </>
    )

}
export default TestDemo;