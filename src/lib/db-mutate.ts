import { api } from "@/trpc/react"
import { toast } from "sonner";

const trpc = api.useUtils();

const {mutate:mutateEdit} = api.todo.edit.useMutation({
    onSettled: async()=>{
      await trpc.todo.all.invalidate()
    },
    onMutate: async({id,text})=>{
      await trpc.todo.all.cancel()
      const previousData = trpc.todo.all.getData()
      trpc.todo.all.setData(undefined,(prev)=>{
        return prev?.map((todo)=>{
          if (todo.id===id){
            return {...todo, text}
          }
          return todo
        })
      })
      return previousData
    },
    onError: ()=>{
      toast.error('Failed to edit task. Please try again.')
    }
  })

export function editMutation(id:string,text:string){
    mutateEdit({id,text})
}