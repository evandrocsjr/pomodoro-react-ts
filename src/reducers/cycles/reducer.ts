import { ActionTypes } from "./actios";
import produce from "immer";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cycleReducer(prevState: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(prevState, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = prevState.cycles.findIndex(
        (c) => c.id === prevState.activeCycleId
      );
      if (currentCycleIndex < 0) {
        return prevState;
      }
      return produce(prevState, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = prevState.cycles.findIndex((c) => {
        return c.id === prevState.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return prevState;
      }
      return produce(prevState, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    default:
      return prevState;
  }
}
