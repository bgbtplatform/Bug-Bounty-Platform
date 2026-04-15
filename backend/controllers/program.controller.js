import Program from "./../models/program.model.js"

async function addProgram(req, res) {
    try {
        let newProgram = req.body;
        newProgram = await Program.create(newProgram);
        res.status(201).send(newProgram)

    } catch (error) {
        console.log(error);
        res.status(400).send({message:"program not added", error: error.message })
    }
}

async function allPrograms(req,res){
    try{
        let newProgram = await Program.find();
        res.status(201).send(newProgram)
    } catch(error){
        res.status(404).send({message:"Programs not found",error:error.message})
    }
    
}

async function updateProgram(req,res){
    try{
        let updatedProgram = req.body;
        let { id } = req.params;
        updatedProgram = await Program.findOneAndUpdate({_id:id},updatedProgram,{returnDocument:"after"});
        if (updatedProgram !== null) {
            res.status(200).send(updatedProgram);
        } else {
            res.status(404).send({ message: "Program not found" });
        }

    } catch(error){
        res.status(400).send({message:"Program not updated",error:error.message})
    }
}

async function deleteProgram(req,res){
    try{
        let {id} = req.params
        let program = await Program.findOneAndDelete({_id:id})
        if(program !== null){
            res.status(200).send({message:"Program deleted"})
        } else {
            res.status(400).send({message:"Program not deleted",error:error.message})
        }
    } catch(error){
        res.status(400).send({message:"Program not deleted",error:error.message})
    }
}

export {
    addProgram,allPrograms,updateProgram,deleteProgram
}