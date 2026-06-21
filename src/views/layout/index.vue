<template>
  <div>
    <h1>这是后台首页</h1>
  </div>
  <div>
    <p>用户ID：{{indexForm.userId}} </p>
    <p>用户名称：{{ indexForm.userName }}</p>
    <p>头像：{{ indexForm.avatar }}</p>
    <div class="content">
      <h1>{{ title }}</h1>
      <!-- 渲染富文本内容 -->
      <article v-html="safeHtml"></article>

      <!-- 渲染包含样式的 HTML -->
      <div v-html="unsafeHtml"></div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import useUserStore from "@/stores/modules/userStore.js"
  import DOMPurify from 'dompurify'
  const title = ref('文章标题')


  const unsafeHtml = '<img src=x onerror="alert(1)">Hello'
  const safeHtml = ref(DOMPurify.sanitize(unsafeHtml)) // 会移除危险的事件处理器

  const articleContent = ref(`  <p>第一段内容<strong>加粗文字</strong></p>
  <p>第二段内容<em>斜体文字</em></p>
  <ul>
    <li>列表项1</li>
    <li>列表项2</li>
  </ul>`)

  // const styledContent = ref('<img src="x" onerror="alert&#40;1&#41;">')
  const styledContent = ref('&lt;img src="x" onerror="alert&#40;1&#41;"&gt;')


  const indexForm = ref({
    userId: "<script>alert(1)<\/script>",
    userName: "333",
    avatar: "222"
  })
  const userStore = useUserStore()
  const user = userStore.getUserInfo()

  // 如果 userId 不为空，则获取用户信息
  if (user.userId !== '') {
    // 更新用户信息
    indexForm.userId = user.userId
    indexForm.userName = user.userName
    indexForm.avatar = user.avatar
  }
</script>

<style scoped>

</style>