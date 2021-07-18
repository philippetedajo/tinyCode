import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  set_monaco_input_value,
  set_editor_value,
  set_template_modal,
  clear_logs,
} from "../store/features/editorSlice";
import { EditorValueInterface } from "../_types/editorTypes";
import { compiler_state, initEsbuild } from "../store/features/compilerSlice";

export const useTree = () => {
  const dispatch = useAppDispatch();
  const { esbuildStatus } = useAppSelector(compiler_state);

  const setTree = (data: EditorValueInterface) => {
    //  init Esbuild compiler
    if (!esbuildStatus.isReady) {
      dispatch(initEsbuild());
    }

    dispatch(clear_logs());
    dispatch(set_monaco_input_value(data));
    dispatch(set_editor_value(data));
    dispatch(set_template_modal(false));
  };

  return { setTree };
};
