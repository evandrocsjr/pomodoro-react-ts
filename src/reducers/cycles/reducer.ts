export interface Reducer {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Reducer[];
  activeCycleId: string | null;
}

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function cycleReducer(prevState: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...prevState,
        cycles: [...prevState.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...prevState,
        cycles: prevState.cycles.map((cycle) => {
          if (cycle.id === prevState.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else return cycle;
        }),
        activeCycleId: null,
      };
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...prevState,
        cycles: prevState.cycles.map((cycle) => {
          if (cycle.id === prevState.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else return cycle;
        }),
        activeCycleId: null,
      };
    default:
      return prevState;
  }
}
