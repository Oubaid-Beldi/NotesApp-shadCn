// import { Label } from "@radix-ui/react-label";
// import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button, buttonVariants } from "./components/ui/button";
import { useState } from "react";
import {Note} from "./types/Note"
import { Card, CardFooter, CardHeader, CardTitle } from "./components/ui/card";

export default function App() {
  const [note, setNote]=useState<Note>({content:""})
  const [notesList,setNotesList]=useState<Note[]>([])
  const [editIndex,setEditIndex]=useState<number|null>(null)
  const createNote= (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setNote({content:event.target.value})
  }
  const addNewNote=(note:Note)=>{
    setNotesList([...notesList,note])
    setNote({content:""})
  }
  const deleteNote=(note:Note)=>{
    const newList=notesList.filter(n=>n.content!=note.content)
    setNotesList(newList)
  }
  const handleEdit=(index:number)=>{
      setEditIndex(index)
      setNote({content:notesList[index].content})
  }
  const saveEdit=()=>{
    if (editIndex !==null){
      const updatedNotes=[...notesList]
      updatedNotes[editIndex]={content:note.content}
      setNotesList(updatedNotes);
      setEditIndex(null)
      setNote({content:""})
    }

  }
  return (
    <div className="">
      <div className="container mx-auto m-8">
          <h1 className="text-center m-8 ">Quick Notes 📝</h1>
          <div className="flex flex-col justify-between">
            {/* Create a note */}
            <div className="flex flex-row justify-between items-center ">
          <Textarea value={note.content} className="w-4/5" id="content" onChange={createNote} placeholder="add a note"/>
          <Button tabIndex={0} className="mr-8" onClick={()=>{editIndex===null ? addNewNote(note):saveEdit()}} >{editIndex===null ? "Add":"Save"}</Button>
          </div>
          
          {/* Note list */}
          <div className="mt-8">

            {
              notesList.map((n,index)=>{
                return <Card className="m-4" key={index}>
                  <CardHeader>
                    <CardTitle>
                    {n.content}
                    </CardTitle>
                  </CardHeader> 
                  <CardFooter className="flex flex-row justify-between">
                    {/* Edit */}
                    <Button  className="bg-yellow-500 hover:bg-yellow-400" color="yellow" onClick={()=>handleEdit(index)}>Edit</Button>
                    {/* Delete */}
                    <Button className={buttonVariants({variant:"destructive"}) } onClick={()=>{deleteNote(n)}}>Delete</Button>
                  </CardFooter>
                </Card>
              })
            }
          </div>
          </div>


      </div>
    </div>
  )
}