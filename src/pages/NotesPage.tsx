import React, { useEffect, useState } from 'react';
// import { Tree, Spin, Collapse } from 'antd';
import { getDoc, doc } from 'firebase/firestore';
import { FirebaseContext } from '../context/firebase';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import callouts from 'remark-callouts';
import remarkParse from 'remark-parse';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkMermaid from 'remark-mermaid-plugin';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';


export interface NoteNode {
    title: string;
    key: string;
    fullPath?: string;
    children?: NoteNode[];
    isLeaf?: boolean;
}

export interface CurrentFile {
    path: string;
    content: string;
}


const NotesPage: React.FC = () => {
    const { db } = React.useContext(FirebaseContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [treeData, setTreeData] = useState<NoteNode[]>([]);
    const [filesPath, setFilesPath] = useState<{[key: string]: string}>({});
    const [currentFile, setCurrentFile] = useState<CurrentFile | undefined>(undefined);
    const [fileIsLoading, setFileIsLoading] = useState<boolean>(false);

    const fetchTree = async () => {
        const treeResult = await getDoc(doc(db!, "tree", "chunk0"));
        console.log("Tree fetched.")
        console.log(treeResult.data());
        const rawFilesList = treeResult.data();
        if(rawFilesList){
            const files: {[key: string]: string} = rawFilesList['files'];
            let tree: NoteNode[] = [];
            let makingFilesPath: {[key: string]: string} = {};
            let currentTree = tree;

            for(let node in files){
                let path = "";
                let key = "0-";
                for(let member of node.split('/')){
                    const isLeaf = member.indexOf('.') != -1;
                    path += "/" + member;
                    let index = currentTree.findIndex((n) => n.title === member);
                    if(index == -1){
                        key += `${currentTree.length}-`;
                        const displayKey = key.slice(0, key.length - 1);
                        currentTree.push({title: member, key: displayKey, fullPath: path, isLeaf} as NoteNode);
                        makingFilesPath[path] = files[node];
                        if(!isLeaf){
                            if(currentTree[currentTree.length - 1].children === undefined){
                                currentTree[currentTree.length - 1].children = [];
                            }
                            currentTree = currentTree[currentTree.length - 1].children!
                        }
                    }
                    else{
                        currentTree = currentTree[index].children!;
                        key += `${index}-`;

                    }
                    // console.log(tree);
                    
                    // key += member + "-";
                }
                currentTree = tree;
                key = "0-";
            }
            console.log("Tree made.");
            setTreeData(tree);
            setFilesPath(makingFilesPath);
            setLoading(false);
            console.log(tree);
        }
        else{
            console.log("No files found.");
        }
    }

    const openFile = async (path: string) => {
        const fileId = filesPath[path];
        console.log("Loading file", fileId);
        setFileIsLoading(true);
        const result = await getDoc(doc(db!, "notes", fileId));
        const data = result.data();
        console.log(data);
        if(data){
            const content = data['content'];
            console.log("File loaded.");
            setCurrentFile({
                content,
                path
            });
        }
        else{
            console.log("No data in file");
        }
        setFileIsLoading(false);
    }

    useEffect(() => {
        if(db){
            console.log("Fetching notes");
            fetchTree();
        }
    }, [db]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    // const treeData = notes.map(note => ({
    //     title: note.title,
    //     key: note.id,
    //     children: [
    //         {
    //             title: note.content,
    //             key: `${note.id}-content`,
    //         },
    //     ],
    // }));

    return (
        <div className='flex flex-row flex-wrap overflow-visible'>
            <div style={{ padding: '20px', width: '300px' }}>
                <Collapse defaultActiveKey={['1']}>
                    <Collapse.Panel header="Table of Files" key="1">
                        <Tree.DirectoryTree
                            treeData={treeData}
                            height={300}
                            // defaultExpandAll
                            onSelect={(selectedKeys, info) => {
                                console.log('selected', selectedKeys, info);
                                if(info.node.isLeaf && info.node.fullPath){
                                    setCurrentFile(undefined);
                                    openFile(info.node.fullPath);
                                }
                            }}
                        />
                    </Collapse.Panel>
                </Collapse>
            </div>
            <div className='p-6 h-full w-full overflow-visible'>
                {fileIsLoading ? 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spin size="large" />
                    </div>
                : currentFile ? 
                    // @ts-ignore
                    <Markdown remarkPlugins={[remarkMath, callouts, remarkParse, remarkGfm, remarkMermaid]} rehypePlugins={[rehypeKatex, rehypeRaw, rehypeStringify]} >{currentFile.content.replace("\n", "\n\n")}</Markdown> 
                : 
                    <p>No file is open</p>
                }
                
            </div>
        </div>
    );
};

export default NotesPage;