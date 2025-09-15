import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addNewTask, deleteExistingTask, fetchTasks } from "../service/api";

export default function Index() {
  // tasks state
  const [tasks, setTasks] = useState<any[]>([]);


  // useEffect(() => {
  //   fetch("http://192.168.1.2:5001/api/task")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched tasks:", data);
  //       //setTasks(data);
  //     })
  //     .catch((err) => console.error("Error fetching tasks:", err));
  // }, []);

  useEffect(() =>{
    loadTasks();
  },[]);

  const loadTasks = async() =>{
    const data = await fetchTasks();
    setTasks(data);
  }

  // new task input
  const [newTask, setNewTask] = useState("");

  // function to add a new task
  const addTask = async() => {
    if (!newTask.trim()) return; // ignore empty input
    // const task = {
    //   id: Date.now().toString(), // unique id
    //   title: newTask,
    //   completed: false,
    // };
    // setTasks([...tasks, task]); // add to task list
    // setNewTask(""); // clear input
    await addNewTask(newTask);
    setNewTask("");
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    //setTasks(tasks.filter(task => task._id !== id));
    await deleteExistingTask(id);
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rowContent}
              onPress={() => {
                setTasks((prev) =>
                  prev.map((t) =>
                    t._id === item._id ? { ...t, completed: !t.completed } : t
                  )
                );
              }}
            >

            
              <View style={[styles.dot, item.completed && styles.dotDone]} />
              <Text style={[styles.taskText, item.completed && styles.taskDone]}>
                {item.title}
              </Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item._id)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
          </View>

         
          

          
        )}
        ListEmptyComponent={<Text>No tasks yet</Text>}
      />

      {/* Add Task Section */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 5, justifyContent: "space-between" },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "gray", marginRight: 10 },
  dotDone: { backgroundColor: "green" },
  taskText: { fontSize: 16 },
  taskDone: { textDecorationLine: "line-through", color: "gray" },
  separator: { height: 1, backgroundColor: "#ddd" },
  addContainer: { flexDirection: "row", marginTop: 15, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  delete: {
    fontSize: 10,
    marginLeft: 10,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,  
  },
});
