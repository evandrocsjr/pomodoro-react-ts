import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import { CyclesContext } from "../../index";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa!"),
  owner: zod.string().optional(),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 5 minutos!")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos!"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 25,
      task: "",
    },
  });
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
