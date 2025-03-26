import {
  FaBrandsRust,
  FaSolidFileLines,
  FaSolidFolderMinus,
  FaSolidFolderPlus,
} from "solid-icons/fa";
import { Index } from "solid-js";

import styles from "./FileExplorer.module.sass";
import { File, fileExplorer, FileNode, FileNodeKind, Folder } from "./store";
import { ContextMenu } from "../../context-menu/ContextMenu";

function RenderFolder({ data }: { data: Folder }) {
  return (
    <li class={styles.entry_folder}>
      <details>
        <ContextMenu
          as="summary"
          options={{
            [data.name]: { disabled: true },
            "Add File": {},
            "Copy": {},
            "Paste": {},
            "Rename": { level: "warning" },
            "Delete": { level: "error" },
          }}
        >
          <FaSolidFolderPlus class={styles.closed_folder} />
          <FaSolidFolderMinus class={styles.opened_folder} />

          <span>{data.name}</span>
        </ContextMenu>
        <ul>
          <RenderNodes nodes={data.children} />
        </ul>
      </details>
    </li>
  );
}

function RenderFile({ data }: { data: File }) {
  return (
    <ContextMenu
      as="li"
      classList={{
        [styles.entry]: true,
        [styles.entry_syncing]: data.synced,
      }}
      options={{
        [data.filename]: { disabled: true },
        "Copy": {},
        "Paste": {},
        "Rename": { level: "warning" },
        "Delete": { level: "error" },
      }}
    >
      {data.filename.endsWith(".rs") ? <FaBrandsRust /> : <FaSolidFileLines />}
      <span>{data.filename}</span>
    </ContextMenu>
  );
}

function RenderNodes({ nodes }: { nodes: FileNode[] }) {
  return (
    <Index each={nodes}>
      {(node_) => {
        const node = node_();
        return node.kind == FileNodeKind.Folder
          ? <RenderFolder data={node.data} />
          : <RenderFile data={node.data} />;
      }}
    </Index>
  );
}

export function FileExplorer() {
  return (
    <ContextMenu
      as="ul"
      class={styles.container}
      options={{
        "Add File": {},
        "Add Folder": {},
      }}
    >
      <RenderNodes nodes={fileExplorer[0].nodes} />
    </ContextMenu>
  );
}
