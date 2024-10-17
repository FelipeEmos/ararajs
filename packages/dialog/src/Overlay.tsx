import { combineStyle, type ElementOf, type Ref } from "@arara/utils/dom";
import {
  createMemo,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic, type DynamicProps } from "@arara/utils/dynamic";
import { mergeRefs, some } from "@arara/utils/reactivity";
import { dataIf } from "@arara/utils";
import { useInternalDialogContext } from "@src/context";

export type DialogOverlayAraraProps = {
  /**
   * Whether the dialog overlay should be forced to render. Useful when using third-party animation libraries.
   * @defaultValue `false`
   */
  forceMount?: boolean;
  /**
   * The `id` of the dialog context to use.
   */
  contextId?: string;
};

export type DialogOverlaySharedElementProps<T extends ValidComponent = "div"> =
  {
    ref: Ref<ElementOf<T>>;
    style: string | JSX.CSSProperties;
  };

export type DialogOverlayElementProps = DialogOverlaySharedElementProps & {
  "aria-hidden": "true" | undefined;
  "data-closed": "" | undefined;
  "data-open": "" | undefined;
  "data-arara-dialog-overlay": "" | null;
};

export type DialogOverlayProps<T extends ValidComponent = "div"> =
  DialogOverlayAraraProps & Partial<DialogOverlaySharedElementProps<T>>;

/** Component which can be used to create a faded background. Can be animated.
 *
 * @data `data-arara-dialog-overlay` - Present on every dialog overlay element.
 * @data `data-open` - Present when the dialog is open.
 * @data `data-closed` - Present when the dialog is closed.
 */
const DialogOverlay = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DialogOverlayProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DialogOverlayProps, [
    "forceMount",
    "contextId",
    "ref",
    "style",
  ]);

  const context = createMemo(() =>
    useInternalDialogContext(localProps.contextId),
  );

  const show = () =>
    some(context().open, () => localProps.forceMount, context().overlayPresent);

  return (
    <Show when={show()}>
      <Dynamic<DialogOverlayElementProps>
        as="div"
        // === SharedElementProps ===
        ref={mergeRefs(context().setOverlayRef, localProps.ref)}
        style={combineStyle(
          {
            "pointer-events": "auto",
          },
          localProps.style,
        )}
        // === ElementProps ===
        aria-hidden="true"
        data-closed={dataIf(!context().open())}
        data-open={dataIf(context().open())}
        data-arara-dialog-overlay=""
        {...otherProps}
      />
    </Show>
  );
};

export default DialogOverlay;
