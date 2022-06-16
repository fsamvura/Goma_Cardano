<template>
  <div class="bg-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-700 rounded p-3">
    <form action="#">
      <div class="registration-form text-dark text-start">
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
          <div class="filter-search-form relative filter-border">
            <i class="uil uil-briefcase-alt icons"></i>
            <input name="name" type="text" id="job-keyword"
              class="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="TRANSACTION ID">
          </div>

          <div class="filter-search-form relative filter-border">
            <i class="uil uil-map-marker icons"></i>
            <input name="name" type="text" id="job-keyword"
              class="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="LOCATION">
          </div>

          <div class="filter-search-form relative filter-border">
            <i class="uil uil-briefcase-alt icons"></i>
            <input name="name" type="text" id="job-keyword"
              class="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="TYPE">
          </div>

          <input type="submit" id="search" name="search" style="height: 60px;"
            class="btn searchbtn submit-btn bg-primary text-light-100  hover:cursor-pointer hover:bg-blue-400"
            value="Search">
        </div>
        <!--end grid-->
      </div>
      <!--end container-->
    </form>
  </div>
</template>