package uk.nameapp.focusflow

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ArrowBack
import androidx.compose.material.icons.rounded.PlayArrow
import androidx.compose.material.icons.rounded.Stop
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

private val Paper = Color(0xFFF7F6F2)
private val Ink = Color(0xFF1C1B19)
private val SoftInk = Color(0xFF5D5A54)
private val Cinnabar = Color(0xFFB33A2F)
private val Green = Color(0xFF52756B)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { FocusFlowApp(this) }
    }
}

@Composable
private fun FocusFlowApp(context: Context) {
    var screen by rememberSaveable { mutableStateOf("home") }
    var todayMinutes by rememberSaveable { mutableIntStateOf(context.getSharedPreferences("focus", Context.MODE_PRIVATE).getInt("minutes", 0)) }
    var records by rememberSaveable { mutableStateOf(context.getSharedPreferences("focus", Context.MODE_PRIVATE).getString("records", "") ?: "") }

    MaterialTheme(colorScheme = MaterialTheme.colorScheme.copy(background = Paper, surface = Paper, primary = Ink)) {
        AnimatedContent(targetState = screen, label = "screen") { target ->
            when (target) {
                "timer" -> TimerScreen(onBack = { screen = "home" }, onFinished = { minutes ->
                    todayMinutes += minutes
                    context.getSharedPreferences("focus", Context.MODE_PRIVATE).edit().putInt("minutes", todayMinutes).apply()
                    screen = "record"
                })
                "record" -> RecordScreen(onBack = { screen = "home" }, onSave = { note ->
                    records = listOf(note, records).filter { it.isNotBlank() }.joinToString("\n")
                    context.getSharedPreferences("focus", Context.MODE_PRIVATE).edit().putString("records", records).apply()
                    screen = "home"
                })
                else -> HomeScreen(todayMinutes, records, onStart = { screen = "timer" })
            }
        }
    }
}

@Composable
private fun HomeScreen(todayMinutes: Int, records: String, onStart: () -> Unit) {
    Column(Modifier.fillMaxSize().background(Paper).padding(26.dp), verticalArrangement = Arrangement.SpaceBetween) {
        Column {
            Text("微进展", fontSize = 17.sp, fontWeight = FontWeight.SemiBold, letterSpacing = 3.sp, color = Ink)
            Spacer(Modifier.height(76.dp))
            Text("今天，\n把一点时间\n留给自己。", fontFamily = FontFamily.Serif, fontSize = 46.sp, lineHeight = 51.sp, color = Ink)
            Spacer(Modifier.height(20.dp))
            Text("专注不必很久。开始，就已经是一种进展。", fontSize = 15.sp, lineHeight = 24.sp, color = SoftInk)
        }
        Column {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Stat("TODAY", "${todayMinutes} min")
                Stat("MOMENTS", "${records.lines().filter { it.isNotBlank() }.size}")
            }
            Spacer(Modifier.height(20.dp))
            Button(onClick = onStart, modifier = Modifier.fillMaxWidth().height(60.dp), shape = RoundedCornerShape(2.dp), colors = ButtonDefaults.buttonColors(containerColor = Ink, contentColor = Paper)) {
                Icon(Icons.Rounded.PlayArrow, null)
                Spacer(Modifier.width(8.dp))
                Text("开始专注  ·  25 分钟", fontSize = 15.sp)
            }
            Spacer(Modifier.height(24.dp))
            Text("最近的微进展", fontSize = 12.sp, color = Cinnabar, letterSpacing = 1.sp)
            Spacer(Modifier.height(8.dp))
            Text(records.lines().filter { it.isNotBlank() }.take(2).joinToString("\n") { "·  $it" }.ifBlank { "还没有记录。完成一次专注后，写下一句话。" }, fontSize = 14.sp, lineHeight = 23.sp, color = SoftInk)
        }
    }
}

@Composable private fun Stat(label: String, value: String) { Column { Text(label, fontSize = 10.sp, letterSpacing = 1.sp, color = Green); Text(value, fontSize = 23.sp, fontFamily = FontFamily.Serif, color = Ink) } }

@Composable
private fun TimerScreen(onBack: () -> Unit, onFinished: (Int) -> Unit) {
    var seconds by rememberSaveable { mutableIntStateOf(25 * 60) }
    var running by rememberSaveable { mutableStateOf(false) }
    val rotation by animateFloatAsState(if (running) 360f else 0f, label = "breath")
    LaunchedEffect(running, seconds) { if (running && seconds > 0) { delay(1000); seconds -= 1 }; if (seconds == 0) { running = false; onFinished(25) } }
    Column(Modifier.fillMaxSize().background(Paper).padding(26.dp)) {
        Icon(Icons.Rounded.ArrowBack, "返回", Modifier.clickable(onClick = onBack), tint = Ink)
        Spacer(Modifier.weight(1f))
        Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
            Text("◇", fontSize = 260.sp, color = Cinnabar.copy(alpha = .10f), modifier = Modifier.rotate(rotation))
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("FOCUS", fontSize = 10.sp, letterSpacing = 2.sp, color = Green)
                Text("%02d:%02d".format(seconds / 60, seconds % 60), fontFamily = FontFamily.Serif, fontSize = 70.sp, color = Ink)
                Text(if (running) "慢慢来，正在发生。" else "准备好再开始。", color = SoftInk, fontSize = 14.sp)
            }
        }
        Spacer(Modifier.weight(1f))
        Button(onClick = { running = !running }, modifier = Modifier.fillMaxWidth().height(60.dp), shape = RoundedCornerShape(2.dp), colors = ButtonDefaults.buttonColors(containerColor = if (running) Cinnabar else Ink, contentColor = Paper)) {
            Icon(if (running) Icons.Rounded.Stop else Icons.Rounded.PlayArrow, null)
            Spacer(Modifier.width(8.dp)); Text(if (running) "暂停" else "开始专注")
        }
    }
}

@Composable
private fun RecordScreen(onBack: () -> Unit, onSave: (String) -> Unit) {
    var note by rememberSaveable { mutableStateOf("") }
    Column(Modifier.fillMaxSize().background(Paper).padding(26.dp)) {
        Icon(Icons.Rounded.ArrowBack, "返回", Modifier.clickable(onClick = onBack), tint = Ink)
        Spacer(Modifier.height(72.dp))
        Text("这一刻，\n值得记下什么？", fontFamily = FontFamily.Serif, fontSize = 45.sp, lineHeight = 51.sp, color = Ink)
        Spacer(Modifier.height(18.dp))
        Text("不必很大。一点推进、一份坚持，或一次照顾自己。", fontSize = 15.sp, lineHeight = 23.sp, color = SoftInk)
        Spacer(Modifier.height(35.dp))
        OutlinedTextField(value = note, onValueChange = { note = it }, modifier = Modifier.fillMaxWidth().height(145.dp), placeholder = { Text("例如：我终于开始整理那份资料。") }, minLines = 4)
        Spacer(Modifier.weight(1f))
        Button(onClick = { onSave(note.ifBlank { "我完成了一次专注。" }) }, modifier = Modifier.fillMaxWidth().height(60.dp), shape = RoundedCornerShape(2.dp), colors = ButtonDefaults.buttonColors(containerColor = Ink, contentColor = Paper)) { Text("保存这份微进展") }
    }
}
